# Deploy "onluyentoan" lên VPS CentOS 8

Hướng dẫn này dành riêng cho dự án hiện tại:
- Backend: Express 5 + Mongoose, dùng MongoDB Atlas (cloud, không cần cài Mongo trên VPS), port mặc định `5001`.
- Frontend: Next.js 13 (pages router), chạy `next start`, cần build trước.

## 0. Lưu ý quan trọng về CentOS 8

CentOS 8 đã **hết hỗ trợ (EOL) từ 31/12/2021** — repo `mirrorlist.centos.org` không còn hoạt động, phải trỏ sang `vault.centos.org` mới `yum update` được. Nếu VPS mới tinh và chưa gấp về hệ điều hành cụ thể, nên cân nhắc **Rocky Linux 8** hoặc **CentOS Stream 8** thay vì CentOS 8 gốc — các bước bên dưới vẫn dùng được gần như nguyên vẹn. Nếu vẫn muốn dùng CentOS 8, chạy trước:

```bash
sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-Linux-*
sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-Linux-*
sudo yum update -y
```

## 1. Chuẩn bị VPS

```bash
# Tạo user riêng, không deploy bằng root
sudo adduser deploy
sudo usermod -aG wheel deploy
su - deploy

# Cài công cụ cơ bản
sudo yum groupinstall -y "Development Tools"
sudo yum install -y git firewalld
sudo systemctl enable --now firewalld
```

## 2. Cài Node.js 18+ (bắt buộc — Express 5 và Next 13 không chạy tốt trên Node cũ)

```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
node -v   # >= 18.x
npm -v
```

## 3. Cài PM2 (quản lý process) và Nginx

```bash
sudo npm install -g pm2
sudo yum install -y nginx
sudo systemctl enable --now nginx
```

## 4. Lấy code lên VPS

```bash
mkdir -p ~/apps && cd ~/apps
git clone <url-repo-backend> onluyentoan_BE
git clone <url-repo-frontend> onluyentoan_FE
```

## 5. Cấu hình & chạy Backend

```bash
cd ~/apps/onluyentoan_BE
npm install --omit=dev
```

Tạo file `.env` (không commit file này lên git):

```env
DB_CONNECTION=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/onluyentoan?retryWrites=true&w=majority
DB_DATABASE=onluyentoan
JWT_SECRET=<chuỗi ngẫu nhiên dài, KHÁC với giá trị dev đang dùng>
JWT_EXPIRE=7d
PORT=5001
```

**Quan trọng:** đổi `JWT_SECRET` sang một chuỗi mới sinh ngẫu nhiên cho production (không tái dùng giá trị dev), và đổi mật khẩu MongoDB Atlas nếu chuỗi kết nối cũ từng được dán vào bất kỳ nơi nào không an toàn — chuỗi kết nối/API key rò rỉ là rủi ro bảo mật thật, không chỉ là hình thức.

Trên MongoDB Atlas → Network Access, thêm IP public của VPS vào whitelist (hoặc `0.0.0.0/0` nếu chấp nhận rủi ro, không khuyến nghị cho production).

Chạy bằng PM2:

```bash
pm2 start server.js --name onluyentoan-api
pm2 save
```

## 6. Build & chạy Frontend

```bash
cd ~/apps/onluyentoan_FE
npm install
```

Tạo `.env` (hoặc `.env.production`):

```env
NEXT_PUBLIC_API_URL=https://api.tenmiendomain.vn/api
```

(dùng domain/subdomain thật cho backend, không dùng `localhost` khi lên production)

```bash
npm run build
pm2 start npm --name onluyentoan-web -- start -- -p 3005
pm2 save
```

## 7. Cho PM2 tự khởi động lại khi VPS reboot

```bash
pm2 startup systemd -u deploy --hp /home/deploy
# copy lệnh sudo mà lệnh trên in ra và chạy nó
pm2 save
```

## 8. Thư mục upload tài nguyên (`uploads/resources`)

Đây là dữ liệu quan trọng, không nằm trong git. Cần:
- Đảm bảo thư mục `uploads/` trong `onluyentoan_BE` có quyền ghi cho user chạy PM2 (`chmod -R 755` hoặc chown đúng user `deploy`).
- Đưa vào lịch backup định kỳ (rsync/cron sang nơi khác) — vì hiện tại file lưu trên đĩa local VPS, nếu VPS hỏng ổ đĩa sẽ mất toàn bộ file đã upload.

## 9. Cấu hình Nginx reverse proxy

Tạo `/etc/nginx/conf.d/onluyentoan.conf`:

```nginx
# Frontend
server {
    listen 80;
    server_name tenmiendomain.vn www.tenmiendomain.vn;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Backend API (subdomain riêng, khớp với NEXT_PUBLIC_API_URL ở bước 6)
server {
    listen 80;
    server_name api.tenmiendomain.vn;

    client_max_body_size 60M;  # để upload PDF tối đa 50MB không bị Nginx chặn trước khi tới multer

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### SELinux (CentOS mặc định bật SELinux — hay bị quên, gây lỗi 502 "Permission denied" dù config Nginx đúng)

```bash
sudo setsebool -P httpd_can_network_connect 1
```

## 10. Firewall — chỉ mở cổng cần thiết ra ngoài

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

Không mở port `3005` hay `5001` ra ngoài — chỉ Nginx (port 80/443) mới public, app Node chỉ lắng nghe `127.0.0.1`.

## 11. SSL miễn phí (Let's Encrypt)

```bash
sudo yum install -y epel-release certbot python3-certbot-nginx
sudo certbot --nginx -d tenmiendomain.vn -d www.tenmiendomain.vn -d api.tenmiendomain.vn
```

Certbot tự sửa file Nginx để redirect HTTP → HTTPS và tự gia hạn (kiểm tra `sudo certbot renew --dry-run`).

## 12. Quy trình deploy khi có code mới

```bash
# Backend
cd ~/apps/onluyentoan_BE
git pull
npm install --omit=dev
pm2 restart onluyentoan-api

# Frontend
cd ~/apps/onluyentoan_FE
git pull
npm install
npm run build
pm2 restart onluyentoan-web
```

## 13. Kiểm tra khi có lỗi

```bash
pm2 logs onluyentoan-api      # log backend
pm2 logs onluyentoan-web      # log frontend
pm2 status                    # 2 process phải "online"
sudo tail -f /var/log/nginx/error.log
```

## Tóm tắt kiến trúc sau khi deploy

```
Internet → Nginx (80/443, có SSL)
             ├─ tenmiendomain.vn      → 127.0.0.1:3005  (Next.js, PM2)
             └─ api.tenmiendomain.vn  → 127.0.0.1:5001   (Express, PM2)
                                            └─ MongoDB Atlas (cloud)
```

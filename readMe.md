# ☁️ CloudVault — AWS Static Website Hosting Demo

A premium, modern static showcase website designed for Cloud Computing lab practicals. Fully responsive, featuring live terminal styling simulations, interactive knowledge quizzes, and zero dependencies.

---

## 🚀 How to Host This Website on AWS EC2

You can deploy this static website on AWS EC2 using either **Apache (httpd)** or **NGINX**. Below are step-by-step guides for both options.

---

### Option A: Hosting with Apache (`httpd`) on Amazon Linux 2023
*Best for Amazon Linux / Red Hat Enterprise instances.*

1. **Update package manager:**
   ```bash
   sudo dnf update -y
   ```

2. **Install Apache Server & Git:**
   ```bash
   sudo dnf install httpd git -y
   ```

3. **Start and enable Apache service:**
   ```bash
   sudo systemctl start httpd
   sudo systemctl enable httpd
   ```

4. **Clone the repository and copy your static assets:**
   ```bash
   cd ~
   git clone https://github.com/AbhiDevOps369/cc-static-website.git
   
   # Remove default Apache page
   sudo rm -rf /var/www/html/*
   
   # Copy cloned website files to the root directory
   sudo cp -r ~/cc-static-website/* /var/www/html/
   ```

5. **Restart Apache to apply changes:**
   ```bash
   sudo systemctl restart httpd
   ```

---

### Option B: Hosting with NGINX on Ubuntu 22.04 LTS
*Best for Ubuntu Instances.*

1. **Update local packages:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install NGINX & Git:**
   ```bash
   sudo apt install nginx git -y
   ```

3. **Start and enable NGINX service:**
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

4. **Deploy static assets:**
   ```bash
   cd ~
   git clone https://github.com/AbhiDevOps369/cc-static-website.git
   
   # Remove default Nginx splash files
   sudo rm -rf /var/www/html/*
   
   # Copy your files
   sudo cp -r ~/cc-static-website/* /var/www/html/
   ```

5. **Verify server configuration and status:**
   ```bash
   sudo systemctl restart nginx
   sudo systemctl status nginx
   ```

---

## 🛡️ Critical AWS Security Group Configuration

To access the website from your web browser, configure the **Inbound Rules** of your EC2 Instance's **Security Group** as follows:

| Protocol | Port Range | Source | Purpose |
|:---|:---|:---|:---|
| **HTTP** | `80` | `0.0.0.0/0` | Allow global public access to website |
| **HTTPS** | `443` | `0.0.0.0/0` | Secure SSL traffic (Optional) |
| **SSH** | `22` | `My IP` | Secure terminal administration access |

---

## ✨ Features Included

* **Fully Responsive UI:** Adapts elegantly across mobile, tablet, and desktop viewports.
* **Premium Glassmorphism Design:** Curated dark-themed layout built with CSS grids, flexbox, and modern typography (`Inter` & `JetBrains Mono`).
* **EC2 Terminal Typing Animation:** Simulates server configuration commands dynamically in the viewport.
* **Cloud Knowledge Quiz:** A custom-built, interactive multiple-choice quiz with real-time score updates and feedback.
* **Live Server Time Ticker:** Dynamically updates timestamp indicators in UTC to reflect a production cloud server context.
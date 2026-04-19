# Update system
sudo dnf update -y

# Install Apache (httpd)
sudo dnf install httpd -y

# Start Apache
sudo systemctl start httpd

# Enable Apache on boot
sudo systemctl enable httpd

# Install git
sudo dnf install git -y

# Go to home
cd ~

# Clone your repo
git clone https://github.com/AbhiDevOps369/cc-static-website.git

# Remove default files
sudo rm -rf /var/www/html/*

# Copy your files to web server
sudo cp -r ~/cc-static-website/* /var/www/html/

# Restart Apache
sudo systemctl restart httpd

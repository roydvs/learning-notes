# Tailscale

## Set up Tailscale

[Install Tailscale docs](https://tailscale.com/kb/1347/installation)

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Set up IP forwarding
# If your Linux system has a /etc/sysctl.d directory, use:
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
# Otherwise, use:
# echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
# echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
# sudo sysctl -p /etc/sysctl.conf

# Linux optimizations for subnet routers and exit nodes
printf '#!/bin/sh\n\nethtool -K %s rx-udp-gro-forwarding on rx-gro-list off \n' "$(ip route show 0/0 | cut -f5 -d" ")" | sudo tee /etc/networkd-dispatcher/routable.d/50-tailscale
sudo chmod 755 /etc/networkd-dispatcher/routable.d/50-tailscale
# Test the script
sudo /etc/networkd-dispatcher/routable.d/50-tailscale
test $? -eq 0 || echo 'An error occurred.'

# Start Tailscale
sudo tailscale up --authkey={AUTH_KEY} --accept-routes --advertise-connector --advertise-exit-node

# Add a new cron to set Telegram cidr
(sudo crontab -l; echo "0 20 * * 1,4 curl https://core.telegram.org/resources/cidr.txt | awk '{output = output \$0 \",\"} END {print substr(output, 1, length(output)-1)}' | xargs -I {} sudo tailscale set --advertise-routes={}") | sudo crontab -
```


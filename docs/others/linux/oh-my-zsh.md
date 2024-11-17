# Oh My Zsh

## Install
[Install Oh My Zsh docs](https://github.com/ohmyzsh/ohmyzsh)

```bash
# Get the type of your shell
echo $SHELL

# Install zsh if it's not installed
sudo apt update
sudo apt install -y zsh curl wget git

# Set the zsh as the default shell
sudo chsh -s $(which zsh) $(whoami)

# Logout and log back in again to user your new default shell
exit

# Install Oh My Zsh
sh -c "$(curl -fsSL https://install.ohmyz.sh/)"
```

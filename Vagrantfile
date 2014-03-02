# -*- mode: ruby -*-
# vi: set ft=ruby :

# Config Github Settings
github_username = "JPBetley"
github_repo     = "Vaprobash"
github_branch   = "citadel"
script_path     = "https://raw.github.com/#{github_username}/#{github_repo}/#{github_branch}/scripts"

# Some variables
server_ip             = "192.168.33.10"
hostname              = "shippit.dev"
ruby_version          = "latest" # Choose what ruby version should be installed (will also be the default version)

Vagrant.configure("2") do |config|

  # Set server to Ubuntu 12.04
  config.vm.box = "precise64"

  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # Create a static IP
  config.vm.network :private_network, ip: server_ip

  # Use NFS for the shared folder
  config.vm.synced_folder ".", "/vagrant",
            id: "core",
            :nfs => true,
            :mount_options => ['nolock,vers=3,udp,noatime']

  # Optionally customize amount of RAM
  # allocated to the VM. Default is 384MB
  config.vm.provider :virtualbox do |vb|

    vb.customize ["modifyvm", :id, "--memory", "384"]

  end

  ####
  # Base Items
  ##########

  # Provision Base Packages
  config.vm.provision "shell", path: "#{script_path}/base.sh"

  # Provision Oh-My-Zsh
  config.vm.provision "shell", path: "#{script_path}/zsh.sh"


  ####
  # Web Servers
  ##########

  # Provision Nginx Base
  # config.vm.provision "shell", path: "#{script_path}/nginx.sh", args: hostname

  ####
  # Databases
  ##########

  # Provision MongoDB
  config.vm.provision "shell", path: "#{script_path}/mongodb.sh"

  ####
  # Additional Languages
  ##########

  # Install Nodejs
  config.vm.provision "shell", path: "#{script_path}/nodejs.sh", privileged: false

  # Install Ruby Version Manager (RVM)
  config.vm.provision "shell", path: "#{script_path}/rvm.sh", privileged: false, args: ruby_version

  ####
  # Frameworks and Tooling
  ##########

  # Install Yeoman
  config.vm.provision "shell", path: "#{script_path}/yeoman.sh", privileged: false

end

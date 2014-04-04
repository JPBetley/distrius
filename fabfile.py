from fabric.api import *
from fabric.contrib.files import *
from fabric.contrib.project import rsync_project
from subprocess import check_output


env.use_ssh_config = True

env.user = 'webmaster'

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
HOME_DIR = '/home/webmaster/distrius'
DEPLOY_PATH = '%s/current' % HOME_DIR
LOG_DIR = '/var/log/distrius/'
BACKUP_DIR = '/tmp/'


def _ensure_dirs():
    dirs = [LOG_DIR]
    for d in dirs:
        sudo('mkdir -p {d}'.format(d=d))
        sudo('chmod -R 777 {d}'.format(d=d))


def setup_upstart(deploy_path=DEPLOY_PATH):
    with cd(deploy_path):
        # Point at master (i.e. symlinked) path
        procfile = os.path.join(DEPLOY_PATH, 'Procfile')
        env_file = os.path.join(DEPLOY_PATH, 'config', '%s.env' %
                                env.deploy_version)
        template_file = os.path.join(DEPLOY_PATH, 'upstart')
        sudo('foreman export upstart /etc/init -f {conf} -e {env} -u webmaster -a distrius -t {tmplt}'.format(
            conf=procfile, env=env_file, tmplt=template_file))


def production():
    """
    Select production instance(s)
    """
    env.hosts = ['distri.us']


def restart():
    with settings(warn_only=True):
        if sudo('restart distrius').failed:
            sudo('start distrius')


def stop():
    with settings(warn_only=True):
        sudo('stop distrius')


def deploy(deploy_version=None):
    """
      Deploy a new version of code to production or test server.

      Push code to remote server, install requirements, apply migrations,
      collect and compress static assets, export foreman to upstart,
      restart service
    """
    # TODO: replace this with
    # - zip up working directory
    # - upload and unzip into DEPLOY_PATH
    env.deploy_version = deploy_version or 'production'
    dirname = check_output(
        ["echo \"$(date +'%Y-%m-%d')-$(git log --pretty=format:'%h' -n 1)\""], shell=True).strip('\n ')
    deploy_path = os.path.join(HOME_DIR, dirname)
    run('mkdir -p {}'.format(deploy_path))
    print 'Uploading project to %s' % deploy_path
    rsync_project(
        remote_dir=deploy_path,
        local_dir='./',
        exclude=['.git', 'backups', 'venv',
                 'static/CACHE', '.vagrant', '*.pyc', 'dev.db'],
    )
    with cd(deploy_path):
        # This may cause a bit of downtime
        run('ln -sfn {new} {current}'.format(
            new=deploy_path,
            current=DEPLOY_PATH
            ))
        setup_upstart(deploy_path)
    restart()
    print "Done!"


def backup():
    """
    Back up database locally

    TODO: send backups to s3
    """
    local('echo "Backups not configured"')



@parallel
def logs():
    """
    Tail logfiles
    """
    sudo('tail -f {logdir}* /var/log/nginx/*.log'.format(logdir=LOG_DIR))

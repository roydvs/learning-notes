---
sidebar_position: 1
---

# Dockerfile

## Parser Directives

```dockerfile
# syntax=docker/dockerfile:1
# syntax=docker/dockerfile:1.2
# syntax=docker/dockerfile:1.2.3

# escape=\
# escape=`
```

#### check

By default, [all checks](https://docs.docker.com/reference/build-checks/) are run, and failures are treated as warnings.

```dockerfile
# check=skip=<checks|all>
# check=error=<boolean>
```

## Shell and Exec Form

```dockerfile
# Shell form
ENTRYPOINT ["sh", "-c", "echo hello"]

# Exec form
ENTRYPOINT echo hello
```

## Environment Replacement
- `${var:-word}`: if `var` is set, then `var`, else `world`
- `${var:+word}`: if `var` is set, then `world`, else `var` 


## Dockerfile Instructions

|Instruction|Description|
|-|-|
|[**ADD**](#add)|Add local or remote files and directories.|
|[**ARG**](#arg)|Use build-time variables.|
|[**CMD**](#cmd)|Specify default commands.|
|[**COPY**](#copy)|Copy files and directories.|
|[**ENTRYPOINT**](#entrypoint)|Specify default executable.|
|[**ENV**](#env)|Set environment variables.|
|[**EXPOSE**](#expose)|Describe which ports your application is listening on.|
|[**FROM**](#from)|Create a new build stage from a base image.|
|[**HEALTHCHECK**](#healthcheck)|Check a container's health on startup.|
|[**LABEL**](#label)|Add metadata to an image.|
|[**ONBUILD**](#onbuild)|Specify instructions for when the image is used in a build.|
|[**RUN**](#run)|Execute build commands.|
|[**SHELL**](#shell)|Set the default shell of an image.|
|[**STOPSIGNAL**](#stopsignal)|Specify the system call signal for exiting a container.|
|[**USER**](#user)|Set user and group ID.|
|[**VOLUME**](#volume)|Create volume mounts.|
|[**WORKDIR**](#workdir)|Change working directory.|

### ADD

```dockerfile
ADD [OPTIONS] <src> ... <dest>
ADD [OPTIONS] ["<src>", ... "<dest>"]

ADD [--keep-git-dir=<boolean>] \
    [--checksum=<hash>] \
    [--exclude=<path> ...] \
    [--chown=<user>:<group>] \
    [--chmod=<perms> ...] \
    [--link] \
    <src> ... <dir>
```

- The `<src>` can be:
  - A local file/directory, `ADD *.txt README.md /usr/src/things/`
  - A local tar archive, `ADD files.tar /usr/src/things/`
  - A URL, `ADD https://example.com/archive.zip /usr/src/things/`
  - A Git repository, `ADD git@github.com:user/repo.git /usr/src/things/`
- For local files, each `<src>` may contain wildcards
- If you specify multiple source files, then the destination **must be a directory(end with a slash `/`)**

### ARG

```dockerfile
ARG <name>[=<default value>] [<name>[=<default value>]...]
```

- An ARG declared before a FROM is outside of a build stage, so **it can't be used in any instruction after a FROM**.
- To use the default value of an ARG declared before the first FROM **use an ARG instruction without a value inside of a build stage**:
  ```dockerfile
  ARG VERSION=latest
  FROM busybox:${VERSION}

  # redeclare VERSION without a value
  ARG VERSION
  RUN echo ${VERSION} > image_version
  ```

### CMD

- `CMD` instructions using [shell or exec forms](#shell-and-exec-form):
  - `CMD ["param1","param2"]` (exec form, as default parameters to `ENTRYPOINT`)
  - `CMD ["executable","param1","param2"]` (exec form)
  - `CMD command param1 param2` (shell form)
- There can only be one CMD instruction in a Dockerfile
- If there are more than one CMD, only the last one takes effect

### COPY

```dockerfile
COPY [OPTIONS] <src> ... <dest>
COPY [OPTIONS] ["<src>", ... "<dest>"]

COPY [--from=<image|stage|context>] \
     [--exclude=<path> ...] \
     [--chown=<user>:<group>] \
     [--chmod=<perms> ...] \
     [--link] \
     [--parents] \
     <src> ... <dest>
```

- For local files, each `<src>` may contain wildcards
- If you specify multiple source files, then the destination **must be a directory(end with a slash `/`)**


### ENTRYPOINT

- `ENTRYPOINT` instructions using [shell or exec forms](#shell-and-exec-form)

#### ENTRYPOINT and CMD

```dockerfile
From alpine:latest
ENTRYPOINT ["sh", "-c", "echo $0 && echo $1"]
CMD ["hello", "world"]
```

- Dockerfile should specify at least one of `CMD` or `ENTRYPOINT` commands
- `ENTRYPOINT` should be defined when using the container as an executable
- `CMD` should be used as a way of defining default arguments for an `ENTRYPOINT` command or for executing an ad-hoc command in a container
- `CMD` will be overridden when running the container with alternative arguments
- If `CMD` is defined from the base image, setting `ENTRYPOINT` will reset CMD to an empty value

### ENV

The environment variables set using ENV will **persist** when a container is run from the resulting image.

If an environment variable is only needed during build, and not in the final image, consider setting a value for a `single command` instead, or using `ARG`, which is not persisted in the final image:

```dockerfile
# single command
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y ...

# ARG
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y ...
```

### EXPOSE

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

### FROM

```dockerfile
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

### HEALTHCHECK

```dockerfile
# Check container health by running a command inside the container
HEALTHCHECK \
  # default: 30s
  [--interval=30s] \
  # default: 30s
  [--timeout=30s] \
  # default: 0s
  [--start-period=0s] \
  # default: 5s
  [--start-interval=5s] \
  # default: 3
  [--retries=3] \
  CMD command

# Disable any healthcheck inherited from the base image
HEALTHCHECK NONE
```

- There can only be one `HEALTHCHECK` instruction in a Dockerfile
- If you list more than one then only the last `HEALTHCHECK` will take effect

### LABEL

```dockerfile
LABEL <key>=<value> [<key>=<value>...]
```

### ONBUILD

```dockerfile
ONBUILD INSTRUCTION

# For example you might add something like this:
ONBUILD ADD . /app/src
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
```

- The `ONBUILD` instruction adds to the image a trigger instruction to be executed at a later time, **when the image is used as the base for another build**
- The trigger will be executed in the context of the downstream build, as if it had been **inserted immediately after the `FROM`** instruction in the downstream Dockerfile

### RUN

```dockerfile
RUN [OPTIONS] <command> ...
RUN [OPTIONS] [ "<command>", ... ]

RUN [--mount=[type=<TYPE>][,option=<value>[,option=<value>]...]] \
    [--network=TYPE] \
    [--security=<sandbox|insecure>] \
    <command> ...
```

### SHELL

```dockerfile
SHELL ["executable", "parameters"]
```

The following instructions can be affected by the `SHELL` instruction when the **shell form** of them is used in a Dockerfile: 
  - `RUN`
  - `CMD`
  - `ENTRYPOINT`.

```dockerfile
FROM microsoft/windowsservercore

# Executed as cmd /S /C echo default
RUN echo default

# Executed as cmd /S /C powershell -command Write-Host default
RUN powershell -command Write-Host default

# Executed as powershell -command Write-Host hello
SHELL ["powershell", "-command"]
RUN Write-Host hello

# Executed as cmd /S /C echo hello
SHELL ["cmd", "/S", "/C"]
RUN echo hello
```

### STOPSIGNAL

The system call signal that will be sent to the container to exit.

```dockerfile
STOPSIGNAL SIG<name>
STOPSIGNAL SignalNum

# default
STOPSIGNAL SIGTERM
```

### USER

 To use as the default user for the remainder of the current stage.

```dockerfile
USER <user>[:<group>]

USER <UID>[:<GID>]
```

### VOLUME

```dockerfile
VOLUME "/dir" ...

# Create a new mount point at /myvol and copy the greeting file into the newly created volume
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
```

### WORKDIR

- The default working directory is `/`, **only if you use** `FROM scratch`
- The `WORKDIR` may likely be set by **the base image** you're using

```dockerfile
# WORKDIR will be /path/$DIRNAME
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd

# WORKDIR will be /a/b/c
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

## .dockerignore Files

```dockerignore "title=.dockerignore"
# Exclude files and directories whose names start with temp in any immediate subdirectory of the root.
# /root/temp, /root/temporary, /root/temporary.txt
*/temp*

# Exclude files and directories starting with temp from any subdirectory that is two levels below the root. 
# /root/temp, /root/sub/temp, /root/sub/temporary
*/*/temp*

# Exclude files and directories in the root directory whose names are a one-character extension of temp.
# /tempa, /temp3
temp?

# !!!!No markdown files are included in the context except README files other than README-secret.md!!!!
*.md
!README*.md
README-secret.md

# !!!!The middle line has no effect!!!!
*.md
README-secret.md
!README*.md
```
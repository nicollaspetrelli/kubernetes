# Docker
Plataforma de containers

# Kubernetes
Orquestração de containers

# minikube
Virtualização para rodar kubernetes no mesmo nó

## Instalação
### Instalação no Linux
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux

```sh
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### Instalação no Windows
https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/

## Configuração

```sh
eval $(minikube -p minikube docker-env)

docker build api/ -t workshop/api

minikube kubectl -- create -f ./k8s/mongo-volume.yml
minikube kubectl -- create -f ./k8s/mongo-volume-claim.yml
minikube kubectl -- create -f ./k8s/mongo-pod.yml
minikube kubectl -- create -f ./k8s/mongo-service.yml
minikube kubectl -- create -f ./k8s/backend-service.yml
minikube kubectl -- create -f ./k8s/backend-deployment.yml
minikube kubectl -- create -f ./k8s/frontend-service.yml
minikube kubectl -- create -f ./k8s/frontend-deployment.yml

minikube kubectl -- get pods
minikube kubectl -- get services
minikube tunnel
```

Se quiser testar diretamente algum pod
```sh
minikube kubectl -- port-forward <nome-do-pod> 3000:3000
```

Para atualizar manualmente a imagem do backend
```sh
docker build ./backend -t workshop/api
minikube kubectl -- set image deployment/backend-deployment backend=workshop/api
minikube kubectl -- rollout restart deployment/backend-deployment
minikube kubectl -- exec -it <pod> -- /bin/sh
```

Para atualizar manualmente a imagem do frontend
```sh
docker build ./frontend -t workshop/frontend
minikube kubectl -- set image deployment/frontend-deployment frontend=workshop/frontend
minikube kubectl -- rollout restart deployment/frontend-deployment
minikube kubectl -- exec -it <pod> -- /bin/sh
```

Para escalar algum _deployment_
```sh
minikube kubectl -- scale --replicas=2 deployment/backend-deployment
``` 

#!/bin/bash

minikube profile minikube2

#helm repo add nginx-stable https://helm.nginx.com/stable
#helm install nginx-ing nginx-stable/nginx-ingress

minikube addons enable registry
minikube addons enable ingress
minikube addons enable ingress-dns

# https://help.mulesoft.com/s/article/Error-Creating-New-Ingress-After-Deleting-Nginx-Ingress-For-RTF-BYOK-Self-Managed-Kubernetes-failed-calling-webhook-validate-nginx-ingress-kubernetes-io
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

docker run --rm -it --network=host --name docker-registry alpine ash -c "apk add socat && socat TCP-LISTEN:5001,reuseaddr,fork TCP:$(minikube ip):5000" &

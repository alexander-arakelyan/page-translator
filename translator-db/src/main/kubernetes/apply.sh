#!/bin/bash

kubectl apply -f config.yaml -n page-translator

kubectl patch pv postgres-pv-volume -n page-translator -p '{"spec":{"claimRef": null}}'

kubectl apply -f pv.yaml -n page-translator
kubectl apply -f deployment.yaml -n page-translator

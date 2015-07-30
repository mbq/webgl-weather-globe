#!/usr/bin/env Rscript

library(RNetCDF)
library(png)

message("Loading NetCDFs...")

if(!exists('u'))
 read.nc(open.nc('uwnd.2014.nc'))->u
if(!exists('v'))
 read.nc(open.nc('vwnd.2014.nc'))->v
if(!exists('at'))
 read.nc(open.nc('air.2014.nc'))->at

frames<-length(u$time);
level<-1;

nrm<-function(X,sc=40){
 (X/sc+1.)/2.->X;
 X[X<0]<-0;
 X[X>1]<-1;
 X
}

superflatten<-function(mat)
 do.call(rbind,lapply(1:frames,function(ri){
  return(t(mat[,,ri]));
 }))

message("Transforming data...")

IMG_U<-nrm(superflatten(u$uwnd[,,level,]),40);
IMG_V<-nrm(superflatten(v$vwnd[,,level,]),40);
IMG_T<-nrm(superflatten(at$air[,,level,]-273.15),50);

IMG_UVT<-array(
 cbind(as.numeric(IMG_U),as.numeric(IMG_V),as.numeric(IMG_T)),
 c(dim(IMG_U),3))

message("Generating PNG...")

writePNG(IMG_UVT,'uvt.png')

message("OK")

variable <- commandArgs(trailingOnly=TRUE)

taille <- as.numeric(variable[1])

fichier <- variable[2]

v <- scan(fichier, what=double(), sep="\n")

matrice <- matrix(v, nrow=taille, ncol=taille, byrow=TRUE)

matriceInverse <- solve(matrice)

for (iter in seq(1,taille,by=1)){
  for (iter2 in seq(1,taille,by=1)){
    print(matriceInverse[iter,iter2])
  }
}

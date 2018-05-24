variable <- commandArgs(trailingOnly=TRUE)

taille <- as.numeric(variable[1])

limite <- (taille * taille) + 1

vect = c();

for (iter in seq(2,limite,by=1)){
  vect = c(vect, c(as.numeric(variable[iter])))
}

matrice <- matrix(vect, nrow=taille, ncol=taille, byrow=TRUE)

matriceInverse <- solve(matrice)

for (iter in seq(1,taille,by=1)){
  for (iter2 in seq(1,taille,by=1)){
    print(matriceInverse[iter,iter2])
  }
}

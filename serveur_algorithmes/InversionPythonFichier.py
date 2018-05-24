#!/usr/bin/python

import sys
import numpy as np

tailleMatrice = int(sys.argv[1])
fichier = open(sys.argv[2], "r")
contenu = fichier.read()
valeurs = contenu.split("\n")

matrice = np.zeros((tailleMatrice, tailleMatrice), dtype='f')

position = 0

for i in range (0, tailleMatrice):
    for j in range (0, tailleMatrice):
        matrice[i][j] = float(valeurs[position])
        position = position + 1

fichier.close()

A_inv = np.linalg.inv(matrice)

for i in range (0, tailleMatrice):
    for j in range (0, tailleMatrice):
        print(A_inv[i][j])

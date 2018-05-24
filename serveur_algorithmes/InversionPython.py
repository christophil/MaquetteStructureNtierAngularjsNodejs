#!/usr/bin/python

import sys
import numpy as np

tailleMatrice = int(sys.argv[1])

matrice = np.zeros((tailleMatrice, tailleMatrice), dtype='i')

position = 2

for i in range (0, tailleMatrice):
    for j in range (0, tailleMatrice):
        matrice[i][j] = int(sys.argv[position])
        position = position + 1

A_inv = np.linalg.inv(matrice)

for i in range (0, tailleMatrice):
    for j in range (0, tailleMatrice):
        print(A_inv[i][j])

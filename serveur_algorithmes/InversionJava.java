public class InversionJava {

	public static void main(String[] args) {

		//int taille = Integer.parseInt(args[0]);

		int taille = Integer.parseInt(args[0]);
		int tailleCarree = taille * taille;
		int position;

		double[][] matrice = new double[taille][taille];
		double[] valeurs = new double[tailleCarree];
		String[] tmp;
		
		position = 1;

		for(int i = 0; i<taille; i++){
			for(int j = 0; j<taille; j++){

				matrice[i][j] = Double.parseDouble(args[position]);

				position++;
			}
		}

	matrice = Matrix.inverse(matrice);

	for(int i = 0; i<taille; i++){
			for(int j = 0; j<taille; j++){

				System.out.println(matrice[i][j]);

				
			}
		}

}
}

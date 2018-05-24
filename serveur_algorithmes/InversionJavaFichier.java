import java.io.*;

public class InversionJavaFichier {

	public static void main(String[] args) throws IOException {

		int tailleTotal = Integer.parseInt(args[1]);
		int taille = (int)Math.sqrt(tailleTotal);

		FileReader influx = new FileReader(args[0]);
		BufferedReader ff2 = new BufferedReader(influx);

		String ligne = "";

		double[][] matrice = new double[taille][taille];

		int position = 0;

		for (int i = 0; i < taille; i++) {
			for (int j = 0; j < taille; j++) {
				ligne = ff2.readLine();
				matrice[i][j] = Double.parseDouble(ligne);
			}
		}

		GaussJordan example = new GaussJordan(matrice);
		example.eliminate();
		System.out.print(example);

	}

}

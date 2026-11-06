import java.util.Scanner;

public class Logic {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[][] grid = new String[6][7];
        boolean player1Turn = true;
        boolean endGame = false;
        int choice;

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                grid[i][j] = "_";
            }
        }

        while (!endGame) {
            if (player1Turn) {
                System.out.println("enter column: ");
                choice = scanner.nextInt();

                for (int i = 0; i < 6; i++) {
                    if (grid[i][choice].equals("_")) {
                        grid[i][choice] = "X";
                        break;
                    }
                }
            } 

            checkWin(grid);

            else {
                System.out.println("enter column: ");
                choice = scanner.nextInt();

                for (int i = 0; i < 6; i++) {
                    if (grid[i][choice].equals("_")) {
                        grid[i][choice] = "O";
                        break;
                    }
                }
                System.out.println("works1");
            }

            player1Turn = !player1Turn;
        }
    }

}

public static checkWin(grid){
    for(int i=0; i<6; i++){
        for(int i=0; i<7,i++){

        }

    }
}
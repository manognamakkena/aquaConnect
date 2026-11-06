import java.util.Scanner;

public class Logic {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[][] grid = new String[6][7];
        boolean player1Turn = true;
        boolean endGame = false;
        int choice;
        String winner = "";

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                grid[i][j] = "_";
            }
        }

        while (!endGame) {
            if (player1Turn) {
                System.out.print("Player 1: Enter column: ");
                choice = scanner.nextInt();

                for (int i = 0; i < 6; i++) {
                    if (grid[i][choice - 1].equals("_")) {
                        grid[i][choice - 1] = "X";
                        break;
                    }
                }
                printBoard(grid);
            }

            else {
                System.out.print("Player 2: Enter column: ");
                choice = scanner.nextInt();

                for (int i = 0; i < 6; i++) {
                    if (grid[i][choice = 1].equals("_")) {
                        grid[i][choice - 1] = "O";
                        break;
                    }
                }
                printBoard(grid);
            }

            player1Turn = !player1Turn;

            if (checkWin(grid)) {
                System.out.println(winner + "Won");
                endGame = true;
            }
        }
    }

    public static boolean checkWin(String grid[][]) {
        for (int i = 0; i < 6; i++) {
            for (int c = 0; c < 4; c++) {

                if (!grid[i][c].equals("_") && grid[i][c].equals(grid[i][c + 1]) && grid[i][c].equals(grid[i][c + 2])
                        && grid[i][c].equals(grid[i][c + 3])) {
                    return true;
                }
            }
        }

        for (int i = 0; i < 6; i++) {
            for (int r = 0; r < 4; r++) {
                if (!grid[r][i].equals("_") &&
                        grid[r][i].equals(grid[r + 1][i]) &&
                        grid[r][i].equals(grid[r + 2][i]) &&
                        grid[r][i].equals(grid[r + 3][i]))

                {
                    return true;
                }
            }
        }

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                if (!grid[i][j].equals("_") &&
                        grid[i][j].equals(grid[i + 1][j + 1])
                        && grid[i][j].equals(grid[i + 2][j + 2])
                        && grid[i][j].equals(grid[i + 3][j + 3]))

                {
                    return true;
                }
            }
        }

        for (int i = 3; i < 6; i++) {
            for (int j = 0; j < 4; j++) {
                if (!grid[i][j].equals("_") &&
                        grid[i][j].equals(grid[i - 1][j + 1])
                        && grid[i][j].equals(grid[i - 2][j + 2])
                        && grid[i][j].equals(grid[i - 3][j + 3]))

                {
                    return true;
                }
            }
        }

        return false;
    }

    public static void printBoard(String grid[][]) {
        for (int i = 5; i >= 0; i--) {
            for (int j = 0; j < 7; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println("1 2 3 4 5 6 7");
    }
}
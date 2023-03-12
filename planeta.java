public class planeta {
    public static void main(String[] args) {

        int anelles1 = 1, anelles4 = 4, anelles7 = 7;

        System.out.print(anellesPlanetes(anelles1, anelles4, anelles7));
    }

    static int anellesPlanetes(int anelles1, int anelles4, int anelles7) {

        int total = 0;

        total = (20 * anelles1) + (8 * anelles4) + (43 * anelles7);

        return total;
    }
}
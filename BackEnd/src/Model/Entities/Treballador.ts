import Entity from "./Entity";
import Categoria from "./Categoria";

class Treballador {

    public Treballador(){};
    
    public Treballador(String nom, String DNI, Categoria c, Rol rol) {
        this.nom = nom;
        this.DNI = DNI;
        this.c = ;c
        this.rol = rol;
    }
    static JDBCTreballadorDAO treballadordao = new JDBCTreballadorDAO();
    static JDBCTreballadorFaGuardiaDAO trebunitdao = new JDBCTreballadorFaGuardiaDAO();
    private String nom;
    private String DNI;
    private Categoria c;
    int qGuardiesTreballades;
    private List<Guardia> guardies = new ArrayList<>();
    private Rol rol;

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public List<Guardia> getGuardies() throws DAOException {
        return trebunitdao.getGuardies(this.getID());
    }

    
    

    

    @Override
    public String toString() {
        return "Treballador{" + "nom=" + nom + ", DNI=" + DNI + ", c=" + c + ", qGuardiesTreballades=" + qGuardiesTreballades + ", id=" + this.getID() + '}';
    }

    public Treballador(String nom, String DNI, Categoria c) throws DAOException {
        this.nom = nom;
        this.DNI = DNI;
        this.c = c;

    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    public Categoria getC() {
        return c;
    }

    public void setC(Categoria c) {
        this.c = c;
    }

   public void reservarGuardia(Guardia g) throws DAOException {
        if (!g.getCoberta()) {
            try {
                trebunitdao.reservarGuardia(this.getID(), g.getID());
            } catch (DAOException ex) {
                throw new DAOException();
            }
            
        }
    }

   public void anularGuardia(Guardia g) throws DAOException {
       
        try {
            trebunitdao.anularGuardia(this.getID(), g.getID());
        } catch (DAOException ex) {
            throw new DAOException();
        }
       

    }

}

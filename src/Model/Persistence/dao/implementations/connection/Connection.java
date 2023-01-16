package hospiolot.model.persistence.dao.implementations.connection;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


public class Connection {
 private final String FILE_CONFIG = "resources/config.properties";

    private static Connection instance;
    private java.sql.Connection connection;

    private Connection() {
        Properties prop = new Properties();
        try {

            InputStream config = new FileInputStream(FILE_CONFIG);
          
                prop.load(config);
                String driver = prop.getProperty("driver");
                String url = prop.getProperty("url");
                String user = prop.getProperty("user");
                String password = prop.getProperty("password");

                Class.forName(driver);

                connection = DriverManager.getConnection(url, user, password);
            
        } catch (IOException ex) {
            System.out.println("ERROR I/O");
        } catch (ClassNotFoundException ex) {
            System.out.println("CLASSE NO TROBADA");
        } catch (SQLException ex) {
            System.out.println("ERROR SQL");
        }

    }

    //Patró singleton
    public static Connection getInstance() {
        if (instance == null) {
            instance = new Connection();
        }

        return instance;
    }

    public java.sql.Connection getConnection() {
        return connection;
    }

    public void disconnect() {
        try {
            connection.close();
        } catch (SQLException ex) {
            System.out.println("ERROR AL DESCONNECTAR");
        }
    }

}
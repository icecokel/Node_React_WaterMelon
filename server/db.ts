import mysql from "mysql";
import ServerConfig from "server/serverConfig";

const con = mysql.createConnection(ServerConfig.dataBase);

con.connect((error) => {
  if (error) {
    console.error("DB Connection ERROR !!!!!!!!!");
    console.error(error);
  }
});

export default con;

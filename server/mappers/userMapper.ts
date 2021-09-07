import mysql from "mysql";
import ServerConfig from "server/serverConfig";

const con = mysql.createConnection(ServerConfig.dataBase);

con.connect((error) => {
  if (error) {
    console.error("DB Connection ERROR !!!!!!!!!");
    console.error(error);
  }
});

const userMapper = {
  getUserList: () => {
    const sql = "SELECT * FROM USERS";
    con.query(sql, (error, results) => {
      if (error) {
        return error;
      }
      if (results) {
        console.log(results);

        return results;
      }
    });
  },
};

export default userMapper;

import express from "express";
import UserController from "./controllers/user";

const app = express();

app.use(express.json());
app.use("/user", UserController);

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send({ message: "success" });
});

app.get("/", (req, res) => {
  res.send("성공입니다 고생하셨어요!");
});

app.listen(1203, () => {
  console.info(
    `  1111111    222222222222222         000000000      333333333333333   PPPPPPPPPPPPPPPPP                                                 tttt          `
  );
  console.info(
    ` 1::::::1   2:::::::::::::::22     00:::::::::00   3:::::::::::::::33 P::::::::::::::::P                                             ttt:::t          `
  );
  console.info(
    `1:::::::1   2::::::222222:::::2  00:::::::::::::00 3::::::33333::::::3P::::::PPPPPP:::::P                                            t:::::t          `
  );
  console.info(
    `111:::::1   2222222     2:::::2 0:::::::000:::::::03333333     3:::::3PP:::::P     P:::::P                                           t:::::t          `
  );
  console.info(
    `   1::::1               2:::::2 0::::::0   0::::::0            3:::::3  P::::P     P:::::P   ooooooooooo   rrrrr   rrrrrrrrr   ttttttt:::::ttttttt    `
  );
  console.info(
    `   1::::1               2:::::2 0:::::0     0:::::0            3:::::3  P::::P     P:::::P oo:::::::::::oo r::::rrr:::::::::r  t:::::::::::::::::t    `
  );
  console.info(
    `   1::::1            2222::::2  0:::::0     0:::::0    33333333:::::3   P::::PPPPPP:::::P o:::::::::::::::or:::::::::::::::::r t:::::::::::::::::t    `
  );
  console.info(
    `   1::::l       22222::::::22   0:::::0 000 0:::::0    3:::::::::::3    P:::::::::::::PP  o:::::ooooo:::::orr::::::rrrrr::::::rtttttt:::::::tttttt    `
  );
  console.info(
    `   1::::l     22::::::::222     0:::::0 000 0:::::0    33333333:::::3   P::::PPPPPPPPP    o::::o     o::::o r:::::r     r:::::r      t:::::t          `
  );
  console.info(
    `   1::::l    2:::::22222        0:::::0     0:::::0            3:::::3  P::::P            o::::o     o::::o r:::::r     rrrrrrr      t:::::t          `
  );
  console.info(
    `   1::::l   2:::::2             0:::::0     0:::::0            3:::::3  P::::P            o::::o     o::::o r:::::r                  t:::::t          `
  );
  console.info(
    `   1::::l   2:::::2             0::::::0   0::::::0            3:::::3  P::::P            o::::o     o::::o r:::::r                  t:::::t    tttttt`
  );
  console.info(
    `111::::::1112:::::2       2222220:::::::000:::::::03333333     3:::::3PP::::::PP          o:::::ooooo:::::o r:::::r                  t::::::tttt:::::t`
  );
  console.info(
    `1::::::::::12::::::2222222:::::2 00:::::::::::::00 3::::::33333::::::3P::::::::P          o:::::::::::::::o r:::::r                  tt::::::::::::::t`
  );
  console.info(
    `1::::::::::12::::::::::::::::::2   00:::::::::00   3:::::::::::::::33 P::::::::P           oo:::::::::::oo  r:::::r                    tt:::::::::::tt`
  );
  console.info(
    `11111111111122222222222222222222     000000000      333333333333333   PPPPPPPPPP             ooooooooooo    rrrrrrr                      ttttttttttt  `
  );
});

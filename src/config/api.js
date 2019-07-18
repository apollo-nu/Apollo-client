const env = "" + process.env.NODE_ENV || "development";
const host = ((env === "production")? "https://apollo-nu.herokuapp.com/" : "http://localhost:8081/");

const routes = {
    courses: host + "courses/",
    row: host + "rows/",
    board: host + "board/"
};

export default routes;
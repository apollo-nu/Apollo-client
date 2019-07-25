const env = "" + process.env.NODE_ENV || "development";
const host = ((env === "production")? "https://apollo-nu.herokuapp.com" : "http://localhost:8081");

const routes = {
    courses: host + "/courses",
    rows: host + "/rows",
    boards: host + "/boards",
    users: host + "/users"
};

export default routes;
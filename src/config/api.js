const env = "" + process.env.NODE_ENV || "development";
const host = ((env === "production")? "https://apollo-nu.herokuapp.com" : "http://localhost:8081");

const routes = {
    courses: host + "/courses",    
    users: host + "/users",
    boards: host + "/boards",
    columns: host + "/columns",
    cards: host + "/cards"
};

export default routes;
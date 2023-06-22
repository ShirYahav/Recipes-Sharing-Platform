class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public connectionString = "mongodb://localhost:27017/recipe-sharing-platform";
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public connectionString = "mongodb://localhost:27017/recipe-sharing-platform";
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;

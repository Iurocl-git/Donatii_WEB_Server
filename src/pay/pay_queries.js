// const postData = "INSERT INTO sensors_general_data (rssi, loraSNR, devEUI, measure_time, battery, value, position) VALUES ($1, $2, $3, $4, $5, $6, $7)";

// const getLastTime = "SELECT MAX(measure_time) AS latest_scan FROM sensors_general_data WHERE devEUI = $1;"
// const getSensorsLastTime = "SELECT s.deveui, MAX(d.measure_time) AT TIME ZONE 'UTC-5' AS latest_scan FROM pay AS s LEFT JOIN sensors_general_data AS d ON s.deveui = d.deveui GROUP BY s.deveui;"

// // const getData = "WITH ranked_data AS (SELECT d.*, ROW_NUMBER() OVER (PARTITION BY deveui ORDER BY measure_time DESC) AS rn FROM sensors_general_data AS d) SELECT * FROM ranked_data WHERE rn = 1;" //fara loccatie

// const getData = "WITH ranked_data AS ( SELECT d.*, s.location, ROW_NUMBER() OVER (PARTITION BY d.deveui ORDER BY d.measure_time DESC) AS rn FROM sensors_general_data AS d LEFT JOIN pay AS s ON d.deveui = s.deveui ) SELECT * FROM ranked_data WHERE rn = 1;"

// const getNames = "SELECT name FROM pay"
//
// const setState = "UPDATE pay SET state = $1 WHERE name = $2;"

module.exports = {
    // getNames,
    // setState
}

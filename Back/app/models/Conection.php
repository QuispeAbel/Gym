<?php
namespace app\models;

use mysqli;
use Exception;

class Conection{
    protected $host = HOST;
    protected $user = USER;
    protected $password = PASS;
    protected $database = DATABASE;

    protected $conection;

    protected $query;

    //variables para la tabla y el id
    //solo son para que el ide no marque error
    protected $table;
    protected $id;

    public function __construct()
    {
        $this->connect();
    }

    public function connect(){

        $this->conection = new mysqli($this->host, $this->user, $this->password, $this->database);
        if($this->conection->connect_error){
            die('Error en la conexión'.$this->conection->connect_error);
        }
    }

    public function query($sql, $data = [], $params = null){

        if($data){
            if($params == null){
                $params = str_repeat('s', count($data));
            }
            $stms = $this->conection->prepare($sql);
            $stms->bind_param($params, ...$data);
            $stms->execute();
            $this->query = $stms->get_result();
        }else{
        $this->query = $this->conection->query($sql);
    }
        return $this;
    }

    public function get(){
        return $this->query->fetch_all(MYSQLI_ASSOC);
    }

    public function all()
    {
        $sql = "SELECT * FROM $this->table";
        return $this->query($sql)->get();
    }

    public function last()
    {
        $sql = "SELECT * FROM $this->table ORDER BY $this->id DESC LIMIT 1";
        return $this->query($sql)->get();
    }

    public function find($id)
    {
        $sql = "SELECT * FROM $this->table WHERE $this->id = ?";
        return $this->query($sql,[$id],'i')->get();
    }

    public function insert()
    {
        try {
            $data = file_get_contents('php://input'); // Obtener datos JSON de la solicitud
            $data = json_decode($data, true); // Decodificar JSON

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
            }

            $columns = implode(',', array_keys($data));
            //$values = implode("','", array_values($data));
            $values = array_values($data);
            $placeholder = implode(',',array_fill(0, count($values), '?'));

            $sql = "INSERT INTO $this->table ($columns) VALUES ($placeholder)";

            $this->query($sql, $values);
             // Devuelve un JSON con éxito
            header('Content-Type: application/json');
            echo json_encode(["success" => true, "message" => "Usted se ha suscrito correctamente"]);
        exit;
        } catch (Exception $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false && strpos($e->getMessage(), 'for key \'dni\'') !== false) {
                http_response_code(400); // Bad Request
                echo json_encode(["success" => false, "message" => "Ya existe una Suscripcion con ese DNI"]);
            }
            else {
                http_response_code(500); // Internal Server Error
                echo json_encode(["success" => false, "message" => "Error al insertar la fila: " . $e->getMessage()]);
            }
        }
    }

    // public function where($column, $operator, $value=null){
    //     if($value == null){
    //         $value = $operator;
    //         $operator = '=';
    //     }

    //     $sql = "SELECT * FROM {$this->table} WHERE {$column} {$operator} ?";
    //     $this->query($sql, [$value], 's');
    //     return $this;
    // }
}
?>
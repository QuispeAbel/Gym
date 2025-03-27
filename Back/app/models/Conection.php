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

    public function query($sql){
        $this->query = $this->conection->query($sql);
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
        $sql = "SELECT * FROM $this->table WHERE $this->id = $id";
        return $this->query($sql)->get();
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
            $values = implode("','", array_values($data));

            $sql = "INSERT INTO $this->table ($columns) VALUES ('$values')";

            $this->query($sql);
            return "La fila se ha insertado correctamente";
        } catch (Exception $e) {
            return 'Error al insertar la fila: ' . $e->getMessage();
        }
    }

    public function update($id)
    {
        try {
            $data = file_get_contents('php://input'); // Obtener datos JSON de la solicitud
            $data = json_decode($data, true); // Decodificar JSON

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
            }


            $sql = "UPDATE $this->table SET ";
            foreach ($data as $key => $value) {
                $sql .= "$key = '$value',";
            }
            $sql .= " WHERE $this->id = $id";
            $sql = str_replace(", WHERE", " WHERE", $sql);

            $this->query($sql);
            return "La fila se ha actualizado correctamente";
        } catch (Exception $e) {
            return 'Error al actualizar la fila: ' . $e->getMessage();
        }
    }
}
?>
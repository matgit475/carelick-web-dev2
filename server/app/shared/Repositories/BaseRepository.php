<?php
namespace App\Shared\Repositories;
use App\Database;
use PDO;

class BaseRepository{
    protected $db;
    public function __construct(Database $database) {
        $this->db = $database->getConnection();
    }

    public function find($table, $table_id, $id) {
        $stmt = $this->db->prepare("SELECT * FROM ".$table." WHERE ".$table_id." = :id");
        $stmt->execute([':id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
    }


    public function create($table, $data) {
        $fields = array_keys($data);
        $placeholders = array_map(fn($key) => ":$key", $fields);

        $sql = "INSERT INTO ".$table." (" . implode(', ', $fields) . ")
                VALUES (" . implode(', ', $placeholders) . ")";

        $stmt = $this->db->prepare($sql);
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->execute();
        return $this->db->lastInsertId();
    }

    public function update($table, $table_id, $id , $data) {
        // Build the query dynamically
        $fields = [];
        $params = [];

        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }

        $params[':id'] = $id;
        $setClause = implode(', ', $fields);

        $this->find($table, $table_id, $id);
        $sql = "UPDATE ".$table." SET $setClause WHERE ".$table_id." = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete($table, $table_id, $id) {
        $this->find($table, $table_id, $id);
        $stmt = $this->db->prepare("DELETE FROM ".$table." WHERE ".$table_id." = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function getAll($table){
        $stmt = $this->db->query("SELECT * FROM ".$table);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
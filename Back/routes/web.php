<?php

use app\models\Cliente;
use lib\Route;

Route::get('/clientes',[Cliente::class, 'all']);
Route::post('/clienteIns',[Cliente::class,'insert']);

Route::dispatch();


?>
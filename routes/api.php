<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UtilisateurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('publication/{id}', [TaskController::class, 'getPublication']);
Route::get('tasks',[TaskController::class,'index']);
// Route::post('tasks/{user}',[TaskController::class,'store']);
Route::post('/tasksssss', [TaskController::class, 'store']);
// Route::get('tasks/create',[TaskController::class,'store']);
Route::post('tasksid/{task}',[TaskController::class,'update']);
Route::get('tasks/{task}',[TaskController::class,'show']);
Route::delete('tasks/{task}',[TaskController::class,'destroy']);
Route::get('category/{category}/tasks',[TaskController::class,'getTaskByCategory']);
Route::get('search/{term}/tasks',[TaskController::class,'getTaskByTerm']);
Route::get('order/{column}/{direction}/tasks',[TaskController::class,'getTasksOrderBy']);
Route::get('categories',[CategoryController::class,'index']);
Route::post('register',[UtilisateurController::class,'register']);
Route::get('user',[UtilisateurController::class,'index']);
Route::post('login',[UtilisateurController::class,'login']);
Route::get('myboutik/{user}', [TaskController::class, 'getTasksByUser']);



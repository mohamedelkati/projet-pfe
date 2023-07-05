<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\Return_;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller
{
    public function index(){
        return 
        Task::with('category','user')->paginate(12);
    }

    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
            'user_id' => 'required',
            'prix' => 'required',
            'image_user' => 'required', // Ajoutez la règle de validation de l'image
        ]);
    
        $image = $request->file('image_user');
        $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
    
        $task = Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'prix' => $request->prix,
            'image_user' => $imageName,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
        ]);
    
        Storage::disk('public')->put($imageName, file_get_contents($request->file('image_user')));
    
        return response()->json(['message' => 'Task created successfully', 'task' => $task]);
    }
    

    


    // public function store(Request $request){
    //     // $task =Task::create([
    //         // 'title'=>$request->title,
    //         // 'body'=>$request->body,
    //         // 'category_id'=>$request->category_id,
    //         // 'user_id'=>$request->user_id
    //         // ]);
    //         $title = $request->title;
    //         $body=$request->body;
    //         $category_id=$request->category_id;
    //         $user_id=$request->user_id;
    //     // DB::select("INSERT INTO tasks(title, body, category_id, user_id) VALUES ('title231','bodyyy2',4,3)");
    //     DB::table('tasks')->insert([
    //         'title' => $title,
    //         'body' => $body,
    //         'category_id' => $category_id,
    //         'user_id' => $user_id
    //     ]);
    //     return [$title,$body,$category_id,$user_id];
    //     // return $task;
        
    // }

    public function show( Task $task){
        return $task;
    }

    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
            'prix' => 'required',
            'done' => 'required',
            'image_user' => 'image', // Mettez à jour la règle de validation de l'image
        ]);
    
        $task->title = $request->title;
        $task->body = $request->body;
        $task->category_id = $request->category_id;
        $task->done = $request->done;
    
        if ($request->hasFile('image_user')) {
            // Supprimer l'ancienne image
            Storage::disk('public')->delete($task->image_user);
    
            // Enregistrer la nouvelle image
            $image = $request->file('image_user');
            $imageName = Str::random(32) . '.' . $image->getClientOriginalExtension();
            Storage::disk('public')->put($imageName, file_get_contents($image));
            $task->image_user = $imageName;
        }
    
        $task->save();
    
        return response()->json($task);
    }
    
    public function destroy(Task $task){
        $task->delete();
        return ['message' =>"task est supprime avec successe"];
    }

    public function getTaskByCategory(Category $category){
        return $category->tasks()->with('category','user')->paginate(12);
    }


    public function getTasksOrderBy($column,$direction){
        Task::with('category','user')->orderBy($column,$direction)->paginate(12);
    }

    public function getTaskByTerm($term){
        $tasks = Task::with('category','user')
        ->where("title","like","%".$term."%")
        ->orWhere("body","like","%".$term."%")
        ->orWhere("id","like","%".$term."%")->paginate(12);
        return $tasks ;
    }

//     public function getTasksByUserAndId($userId, $taskId)
// {
//     $tasks = Task::where('user_id', $userId)
//                 ->where('id', $taskId)
//                 ->get();
    
//     return $tasks;
// }
public function getTasksByUser($user)
{
    $tasks = Task::with('category','user')->where('user_id', $user)->get();
    
    return $tasks;
}

public function getPublication($id)
{
    $tasks = Task::with('category','user')->where('id', $id)->get();
    return $tasks;
}

}


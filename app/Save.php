<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Save extends Model
{
    public function admin_id(){
        return $this->belongsTo('App\User');
    }
    protected $table = 'saves';
    protected $fillable = [
        'uri', 'user_id','wireframe'
    ];
}

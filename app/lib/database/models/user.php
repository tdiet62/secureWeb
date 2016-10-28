<?php
/**
 * To make IDEs autocomplete happy
 *
 * @property int id
 * @property text userName
 * @property text pass
 * @property Object person
 */
class user extends dbObject {
    protected $dbTable = "users";
    protected $dbFields = Array (
    		'userName' => Array('text','required'),
    		'pass' => Array('text'),
    		'person' =>Array('Object')
    );
    
    //protected $timestamps = Array ('createdAt', 'updatedAt');
    protected $relations = Array (
    		'person' => Array ("hasOne", "person", 'id')
    		);
}
?>
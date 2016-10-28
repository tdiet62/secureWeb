<?php
/**
 * To make IDEs autocomplete happy
*
* @property int id
* @property int userid
* @property int customerId
* @property string productName
*/
class person extends dbObject {
	protected $dbTable = "person";
	protected $primaryKey = "id";
	protected $dbFields = Array (
			'userId' => Array('int', 'required'),
			'firstName' => Array ('text', 'required'),
			'lastName' => Array ('text','required')
			);
	protected $relations = Array (
			'userId' => Array ("hasOne", "user"),
			'user' => Array ("hasOne", "user", "userId")
			);
	
}
?>
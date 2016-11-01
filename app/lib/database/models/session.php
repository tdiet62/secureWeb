<?php
/**
 * To make IDEs autocomplete happy
*
* @property int id
* @property int userId
* @property text sessionKey
* @property int expiryDate
*/
class session extends dbObject {
	protected $dbTable = "sessions";
	protected $primaryKey = "id";
	protected $dbFields = Array (
			'userId' => Array('int', 'required'),
			'sessionKey' => Array ('text', 'required'),
			'expiryDate' => Array ('int','required')
			);

	public function getData(){
	    return $this->data;
    }
}
?>
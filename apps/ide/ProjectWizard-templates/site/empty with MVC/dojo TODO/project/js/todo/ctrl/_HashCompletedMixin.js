/*
 * Copyright (c) 2012-2015 S-Core Co., Ltd.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(["dojo/_base/declare"], function(declare){
	var ACTIVE = "/active",
	 COMPLETED = "/completed";

	function getHiddenState(/*Object*/ props){
		// summary:
		//		Returns the new hidden state of todo item, given the URL hash and the completed state of todo item.
		// props: Object
		//		An object containing the URL hash and the completed state of todo item.

		return props.hash == ACTIVE ? props.completed :
		 props.hash == COMPLETED ? !props.completed :
		 false;
	}

	return declare(null, {
		// summary:
		//		A mix-in class for widgets-in-template for todo item, that looks at URL hash and completed state of todo item, and updates the hidden state.
		// description:
		//		A todo item should be hidden if:
		//
		//			- URL hash is "/active" and the todo item is complete -OR-
		//			- URL hash is "/copleted" and the todo item is incomplete

		_setHashAttr: function(/*String*/ value){
			// summary:
			//		Handler for calls to set("hash", val), to update hidden state given the new value and the completed state.

			this.set("hidden", getHiddenState({hash: value, completed: this.completed})); // Update hidden state given the new value and the completed state
			this._set("hash", value); // Assign the new value to the attribute
		},

		_setCompletedAttr: function(/*Boolean*/ value){
			// summary:
			//		Handler for calls to set("completed", val), to update hidden state given the new value and the hash.

			this.set("hidden", getHiddenState({hash: this.hash, completed: value})); // Update hidden state given the new value and the hash
			this._set("completed", value); // Assign the new value to the attribute
		}
	});
});

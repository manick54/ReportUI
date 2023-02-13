
import axios from "axios";
import {drawerList} from './json/DrawerJson';
import {filterList} from './json/FilterJson';


export function getDrawerList() {
console.log(drawerList);
    return drawerList;
 
}

export function getFilterList() {
    return filterList;

}


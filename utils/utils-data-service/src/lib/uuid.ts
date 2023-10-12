import { v4 } from 'uuid';
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class UuidGen {
  generate(): string {
    return v4();
  }
}

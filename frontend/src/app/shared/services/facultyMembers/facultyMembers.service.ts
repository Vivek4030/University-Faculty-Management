import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacultyMembersService {

  baseUrl: string = "http://localhost:3000/members";

  constructor(private _http: HttpClient) { }

  /**
   * Function that sends a POST request to server to add new member 
   * @param member - The details of the new member to be added in database
   * @returns Observable Response object containing details of the member added  
   *           received from server
   */
  public addMember(member: any)
   {
      return this._http.post(`${this.baseUrl}/add`,member);
   }


   /**
   * Function that sends a GET request to server to fetch all the member records
   * @param 
   * @returns Observable Response object containing list of all member records 
   *           received from server
   */
   public getMembersList(type: any) 
   {
      return this._http.get(`${this.baseUrl}/all?type=${type}`);
   }


   /**
   * Function that sends a GET request to server to fetch details of a particular member
   * @param id - The id of the member whose details are to be fetched
   * @returns Observable Response object containing details of the member record 
   *          fetched from server
   */
   public getMemberById(id: number)
   {
      return this._http.get(`${this.baseUrl}/${id}`)
   }


   /**
   * Function that sends a DELETE request to server to delete details of a particular member
   * @param id - The id of the member whose details are to be deleted
   * @returns Observable Response object containing number of member records
   *         deleted from the server
   */
   public deleteMember(id: number)
   {
      return this._http.delete(`${this.baseUrl}/delete/${id}`)
   }


   /**
   * Function that sends a PUT request to server to update details of a particular member
   * @param id - The id of the member whose details are to be updated
   * @returns Observable Response object containing number of member records
   *          updated to  server
   */
   public updateMember(member: any)
   {
      return this._http.put(`${this.baseUrl}/edit/${member.id}`,member);
   }
}

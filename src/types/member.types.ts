export type EmploymentType = 'regular' | 'contract'
export type MemberRole = 'admin' | 'treasurer' | 'member'

export interface Member {
    id:string
    memberNo: string    // e.g. "HMN-0001"
    staffId: string
    fullName: string
    email:string
    phone: string
    department: string
    employmentType: EmploymentType
    role: MemberRole
    photoUrl: string | null     // null if no photo is uploaded
    bankName: string
    isActive: boolean
    joinedAt: string            //  ISO date string
}
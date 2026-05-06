export interface IRole {
        id: number
        name: string
        frName: string
        users: IUser[]
        createdAt: Date
        updatedAt: Date
}

export interface IUser {
        id: number
        email: string
        firstname: string
        lastname: string
        password: string
        pseudo: string
        urlProfilImage: string
        note: number
        createdAt: Date
        updatedAt: Date
        role: IRole
        roleId: string
        createdCours: ICours[]
        badges: UserHasBadge[]
        enrollments: UserHasCours[]
        activations: ICoursActived[]
        commentaires: IComment[]
        opinions: IOpinion[]
        notifications: Notification[]
}

export interface ICours {
        id: number
        slug:string
        title: string
        littleSummary: string
        urlImage: string
        difficulty: number
        summary: string
        visibility: boolean
        createdAt: Date
        updatedAt: Date
        author: IUser
        authorId: number
        category: ICategory
        categoryId: number
        numberPage:number
        tools: CoursHasTool[]
        learningObjectives: CoursHasLearningObjective[]
        content: ICoursContent[]
        enrollments: UserHasCours[]
        activations: ICoursActived[]
        comments: IComment[]
        opinions: IOpinion[]
        notifications: Notification[]
        cours: ICours
}
export interface ICoursContent {
        id: number
        coursId: number
        numberPage: number
        content: string
        createdAt: Date
        updatedAt: Date
        cours: ICours
}
export interface ICategory {
        id: number
        name: string
        description: string    
        textColor: string
        backgroundColor:string
        borderColor: string
        createdAt: Date
        updatedAt: Date
        courses: ICours[]
}

export interface LearningObjective {
        id: number
        title: string
        description: string
        createdAt: Date
        updatedAt: Date
        courses: CoursHasLearningObjective[]
}

export interface Tool {
        id: number
        name: string
        description: string
        createdAt: Date
        updatedAt: Date
        cours: CoursHasTool[]
}
export interface IBadge {
        id: number
        name: string
        description: string
        icon:string
        color:string
        createdAt: Date
        updatedAt: Date
        users: UserHasBadge[]
}

export interface UserHasCours {
        id: number
        userId: number
        coursId: number
        createdAt: Date
        updatedAt: Date
        user: IUser
        cours: ICours
}

export interface ICoursActived {
        id: number
        userId: number
        coursId: number
        IsEnd: Boolean
        createdAt: Date
        updatedAt: Date
        user: IUser
        cours: ICours[]
}
export interface UserHasBadge {
        id: number
        userId: number
        badgeId: number
        createdAt: Date
        updatedAt: Date
        user: IUser
        badge: Badge[]
}
export interface CoursHasTool {
        id: number
        coursId: number
        toolsId: number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        tools: Tool[]
}
export interface CoursHasLearningObjective {
        id: number
        coursId: number
        learningObjectiveId: number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        objectif: LearningObjective
}

export interface IComment {
        id: number
        description: string
        coursId: number
        authorId: number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        author: IUser
}
export interface IOpinion {
  id :number
  content: string
  note  :  number
  coursId: number    
  userId  :number    
  createdAt :Date
  updatedAt :Date
  cours :ICours 
  user : IUser  
}

export interface INotification {
  id :number
  content :string
  coursId  :number
  authorId  :number
  createdAt :Date
  updatedAt :Date
  cours :ICours
  user : IUser
}


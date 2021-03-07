export interface UserAccountRights {
    isOwner: boolean;
    isAdmin: boolean;
    isTransfer: boolean;
    isRead: boolean;
}

export interface UserAccountRightsModel {
    exists: boolean;
    dto: UserAccountRights;
}

export const isDescendant = (parent, child): boolean => {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

export const hasListItemParent = (child): boolean => {
    let node = child;
    let level = 0;
    while (node != null && level < 5) {
        if (node.classList.contains('list-item'))
            return true;
        node = node.parentNode;
        level++;
    }
    return false;
}

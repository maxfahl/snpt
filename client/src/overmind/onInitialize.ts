export const onInitialize = ({ state, effects }, instance) => {
    const previouslyExpandedGroups = localStorage.getItem("expandedGroups");
    if (!!previouslyExpandedGroups) {
        state.expandedGroups = JSON.parse(previouslyExpandedGroups);
    }

    const previouslySelectedSnippet = localStorage.getItem("selectedSnippet");
    if (!!previouslySelectedSnippet)
        state.selectedSnippet = +previouslySelectedSnippet;

    instance.reaction(
        ({ expandedGroups }) => expandedGroups,
        (expandedGroups) => {
            if (expandedGroups) {
                localStorage.setItem(
                    "expandedGroups",
                    JSON.stringify(expandedGroups)
                );
            }
        },
        {
            nested: true
        }
    );

    instance.reaction(
        ({ expandedGroups }) => expandedGroups,
        (expandedGroups) => {
            if (expandedGroups) {
                localStorage.setItem(
                    "expandedGroups",
                    JSON.stringify(expandedGroups)
                );
            }
        },
        {
            nested: true
        }
    );

    instance.reaction(
        ({ selectedSnippet }) => selectedSnippet,
        (selectedSnippet) => {
            if (selectedSnippet)
                localStorage.setItem(
                    "selectedSnippet",
                    selectedSnippet.toString()
                );
            else localStorage.removeItem("selectedSnippet");
        },
        {
            nested: false,
        }
    );

    effects.gql.initialize(
        {
            endpoint: "http://localhost:3001",
            headers: () => ({
                authorization: `Bearer ${state.auth.token}`,
            }),
        },
        {
            endpoint: "ws://localhost:3001",
            params: () => ({
                token: state.auth.token,
            }),
        }
    );
};

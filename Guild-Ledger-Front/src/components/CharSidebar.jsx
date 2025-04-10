import Sidebar from 'react-bootstrap-sidebar-menu';

export default function CharSiderbat() {
    return (
        <Sidebar>
            <Sidebar.Collapse>
                <Sidebar.Header>
                    Guild Ledger
                </Sidebar.Header>
                <Sidebar.Body>
                    <Sidebar.Sub>
                        Character info
                    </Sidebar.Sub>
                </Sidebar.Body>
            </Sidebar.Collapse>
        </Sidebar>
    );
}
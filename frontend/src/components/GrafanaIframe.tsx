const GrafanaIframe = () => {
    return (
        <div style={{ height: '800px', width: '100%' }}>
            <iframe
                src="http://localhost:3000/d/a0fb9bb8-4dff-4d6b-b607-0039a140f21d/new-dashboard?orgId=1&kiosk"
                width="100%"
                height="800"
                title="Grafana Dashboard"
            ></iframe>
        </div>
    );
};

export default GrafanaIframe;

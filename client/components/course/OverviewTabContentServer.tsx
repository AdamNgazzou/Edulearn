// components/OverviewTabContentServer.tsx
import OverviewTabContentClient from './overview-tabClient';

export default async function OverviewTabContentServer({ courseId,AnnouncementData }: { courseId: string ,AnnouncementData:any}) {

  return (
    <div>
      {/* Pass data to the client component */}
      <OverviewTabContentClient courseId={courseId} AnnouncementData={AnnouncementData} />
    </div>
  );
}
